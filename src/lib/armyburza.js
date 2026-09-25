import * as cheerio from 'cheerio'
import { escapeMarkdown } from 'discord.js'
import { db } from './db.js'

const baseURL = 'https://www.armyburza.cz'
const maxShown = 10
const messageLimit = 1950

export const listingsURL = 'https://www.armyburza.cz/kategorie/airsoftove-doplnky/nabidky'

const insertListing = db.prepare(`
    INSERT OR IGNORE INTO seen_listings (url, title, price, posted_at)
    VALUES (:url, :title, :price, :postedAt)
`)

const clean = (text) => text.trim().replace(/\s+/g, ' ')

export async function crawlWebsite(url) {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            console.error(`Error: Unable to fetch the page. Status code: ${response.status}`)
            return null
        }

        const $ = cheerio.load(await response.text())

        return $('.inzerat').map((_, element) => {
            const link = $(element).find('h2 a')

            return {
                url: new URL(link.attr('href'), baseURL).href,
                title: clean(link.text()),
                price: clean($(element).find('.inzerat_price').text()) || null,
                postedAt: clean($(element).find('.inzerat_date').text()) || null
            }
        }).get()
    } catch (error) {
        console.error(`Error: ${error.message}`)
        return null
    }
}

// Crawls the page and returns only listings that haven't been seen before, remembering them for next time
export async function findNewListings(url = listingsURL) {

    const listings = await crawlWebsite(url)

    if (!listings)
        return null

    db.exec('BEGIN')

    try {
        const newListings = listings.filter(listing => insertListing.run(listing).changes === 1)
        db.exec('COMMIT')

        return newListings
    } catch (error) {
        db.exec('ROLLBACK')
        throw error
    }
}

// Builds the message listing new ads, used by both /armyburza and the timer
export function formatListings(listings) {

    let response = `Found ${listings.length} new listing${listings.length === 1 ? '' : 's'} on ArmyBurza:\n\n`

    let shown = 0

    for (const listing of listings.slice(0, maxShown)) {
        const title = listing.title.length > 80 ? `${listing.title.substring(0, 80)}...` : listing.title
        const price = listing.price ? ` — ${listing.price}` : ''
        const line = `${shown + 1}. [${escapeMarkdown(title)}](${listing.url})${price}\n`

        // Discord rejects messages over 2000 characters, leave room for the "more items" line
        if (response.length + line.length > messageLimit)
            break

        response += line
        shown++
    }

    if (listings.length > shown)
        response += `\n... and ${listings.length - shown} more items`

    return response
}
