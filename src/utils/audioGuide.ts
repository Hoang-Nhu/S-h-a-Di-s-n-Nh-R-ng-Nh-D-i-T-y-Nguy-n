/**
 * Audio Guide utility using SpeechSynthesis API
 */
class AudioGuideService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private activeId: string | null = null;
  private listeners: ((state: { isSpeaking: boolean; activeId: string | null }) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: (state: { isSpeaking: boolean; activeId: string | null }) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l({ isSpeaking: this.isSpeaking, activeId: this.activeId }));
  }

  public speak(id: string, text: string, lang: 'vi' | 'en' = 'vi') {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    if (this.isSpeaking && this.activeId === id) {
      this.stop();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'vi' ? 'vi-VN' : 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Try to pick a natural voice if available
    const voices = this.synth.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(lang === 'vi' ? 'vi' : 'en'));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.activeId = id;
      this.notify();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.activeId = null;
      this.notify();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.activeId = null;
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.activeId = null;
      this.notify();
    }
  }

  public getStatus() {
    return { isSpeaking: this.isSpeaking, activeId: this.activeId };
  }
}

export const audioGuide = new AudioGuideService();
