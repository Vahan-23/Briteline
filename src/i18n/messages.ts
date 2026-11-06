import hy from "@/messages/hy.json";
import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import type { NavId, ProcessId, ProjectFilter, ProjectId, ReasonId, ServiceId } from "@/content/site";
import type { Locale } from "./locales";

export type Messages = typeof en;

const catalogs: Record<Locale, Messages> = { en, ru, hy };

export function getMessages(locale: Locale): Messages {
  return catalogs[locale];
}

type Assert<T extends true> = T;
type HasAll<T, K extends string> = K extends keyof T ? true : false;

type _services = Assert<HasAll<Messages["services"]["items"], ServiceId>>;
type _projects = Assert<HasAll<Messages["projects"]["items"], ProjectId>>;
type _filters = Assert<HasAll<Messages["projects"]["filters"], ProjectFilter>>;
type _reasons = Assert<HasAll<Messages["why"]["items"], ReasonId>>;
type _process = Assert<HasAll<Messages["process"]["items"], ProcessId>>;
type _nav = Assert<HasAll<Messages["nav"], NavId>>;

export type { _services, _projects, _filters, _reasons, _process, _nav };
