import { music } from "../config/relationship";
import { asset } from "./assetPath";

let audio: HTMLAudioElement | null = null;
let hasLoaded = false;

/**
 * Lazily creates the shared audio element. Returns null if music is
 * disabled, ensuring the site never breaks without an audio file.
 */
function getAudio(): HTMLAudioElement | null {
  if (!music.enabled) return null;
  if (!audio) {
    audio = new Audio();
    audio.preload = "none";
    audio.volume = 0.4;
    audio.loop = true;
  }
  return audio;
}

/** Preloads the track (called after a user gesture). */
export function initMusic(): void {
  const el = getAudio();
  if (!el) return;
  if (!hasLoaded && music.src) {
    el.src = asset(music.src) ?? "";
    hasLoaded = true;
  }
}

export function playMusic(): Promise<void> {
  initMusic();
  const el = getAudio();
  if (!el) return Promise.resolve();
  return el.play().catch(() => {
    // Autoplay/broken file — fail silently.
  });
}

export function pauseMusic(): void {
  const el = getAudio();
  if (el) el.pause();
}

export function isMusicPlaying(): boolean {
  const el = getAudio();
  return !!el && !el.paused;
}
