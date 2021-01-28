import axios from 'axios';
import cheerio from 'cheerio';
import { clean_2d_array } from './helper';

export async function search(query: string, cleanup = true): Promise<Record<string, string[][]>> {
    const allDefinitions: Record<string, string[][]> = {};
    const response = await axios.get('https://dict.longdo.com/mobile.php', {
        params: { search: query },
    });

    if (response.status != 200) throw new Error(`API didn't respond with status code 200 (got ${response.status})`);

    const $ = cheerio.load(response.data);

    if ($('#count-result').text() === '0') {
        return {};
    }

    $('body > b').each((_: number, el: cheerio.Element) => {
        const elem = $(el);

        let definitions: string[][] = [];

        let longestLength = 0;

        elem.next()
            .find('table > tbody > tr')
            .each((_: number, row: cheerio.Element) => {
                const definition: string[] = [];

                $(row)
                    .children()
                    .each((_: number, data: cheerio.Element) => {
                        let text = $(data).text();
                        if (cleanup) {
                            text = text.trim();
                            text = text.replace(/\[Add to Longdo\]$/, '').trim();
                        }

                        definition.push(text);
                    });

                definitions.push(definition);

                longestLength = Math.max(longestLength, definition.length);
            });

        definitions = clean_2d_array(definitions, longestLength);

        allDefinitions[elem.text()] = definitions;
    });

    return allDefinitions;
}
