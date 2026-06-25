# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static Korean-language login page with no build system or dependencies. Open `index.html` directly in a browser to run it.

## Architecture

Three files, no framework:

- `index.html` — login form (email + password) and social login buttons (Naver, Google, GitHub), written in Korean
- `style.css` — all styles; social button colors are provider-branded (Naver `#03c75a`, Google white/border, GitHub `#24292e`)
- `script.js` — form submit validation and social login placeholder `alert()` calls

## Key Behaviors

- Form submit is handled client-side only (`e.preventDefault()`); there is no backend — "로그인 성공!" is always shown on valid input
- Social login buttons (`data-provider` attribute) trigger an alert saying the provider is not yet integrated
- `.message` element toggles `.error` / `.success` CSS classes to show colored feedback beneath the submit button
