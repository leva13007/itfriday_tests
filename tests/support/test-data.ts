import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * The test oracle for streams and speakers: test-data/*.json, maintained by the site owner.
 * See test-data/README.md.
 */

export type Localised = { ua: string; en: string };

export type ExpectedStream = {
  number: string;
  date: string; // YYYY-MM-DD
  title: Localised; // heading of the stream page, without the "#NNN — " prefix
  listTopic: Localised; // topic column of the streams list
  speakers: string[]; // speaker slugs
  youtubeId: string | null;
};

export type ExpectedSpeaker = {
  slug: string;
  name: Localised;
  linkedin: string | null;
};

type Oracle<T> = { reviewed: boolean; reviewedBy: string | null; reviewedOn: string | null } & T;

function load<T>(file: string): Oracle<T> {
  const path = fileURLToPath(new URL(`../../test-data/${file}`, import.meta.url));
  return JSON.parse(readFileSync(path, 'utf8'));
}

export const streamsData = load<{ streams: ExpectedStream[] }>('streams.json');
export const speakersData = load<{ speakers: ExpectedSpeaker[] }>('speakers.json');

export const expectedStreams = streamsData.streams;
export const expectedSpeakers = speakersData.speakers;
export const oracleReviewed = streamsData.reviewed && speakersData.reviewed;

/** Streams each speaker took part in, derived from streams.json (not stored twice). */
export function streamsOf(slug: string): string[] {
  return expectedStreams.filter((s) => s.speakers.includes(slug)).map((s) => s.number);
}

/** Today's date in Kyiv (the community's time zone) as YYYY-MM-DD. */
export function todayInKyiv(): string {
  // The en-CA locale formats dates as YYYY-MM-DD, the same as the oracle.
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Kyiv' }).format(new Date());
}

/**
 * The next announced stream: the earliest stream dated today or later.
 * A stream stays "next" for its whole day. Undefined when nothing is announced yet.
 */
export function nextStream(today = todayInKyiv()): ExpectedStream | undefined {
  return expectedStreams.filter((s) => s.date >= today).sort((a, b) => a.date.localeCompare(b.date))[0];
}

/** "2026-10-09" → "09.10.2026", the format of the streams list. */
export function listDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}.${month}.${year}`;
}
