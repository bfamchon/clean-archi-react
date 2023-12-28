import { cleanup } from '@testing-library/react';
import { afterEach, expect, vitest } from 'vitest';

import * as matchers from '@testing-library/jest-dom/matchers';

import { fetch, Request, Response } from '@remix-run/web-fetch';

if (!globalThis.fetch) {
  // Built-in lib.dom.d.ts expects `fetch(Request | string, ...)` but the web
  // fetch API allows a URL so @remix-run/web-fetch defines
  // `fetch(string | URL | Request, ...)`
  // @ts-expect-error
  globalThis.fetch = fetch;
  // Same as above, lib.dom.d.ts doesn't allow a URL to the Request constructor
  // @ts-expect-error
  globalThis.Request = Request;
  // web-std/fetch Response does not currently implement Response.error()
  // @ts-expect-error
  globalThis.Response = Response;
}

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vitest.fn().mockImplementation(() => ({
    matchMedia: vitest.fn(),
    addEventListener: vitest.fn(),
    removeEventListener: vitest.fn()
  }))
});
