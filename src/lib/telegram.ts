interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        initDataUnsafe: {
          user?: TelegramUser;
          start_param?: string;
        };
        MainButton: {
          show: () => void;
          hide: () => void;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
        };
      };
    };
  }
}

class TelegramService {
  private static instance: TelegramService;
  private user: TelegramUser | null = null;

  private constructor() {
    this.initWebApp();
  }

  static getInstance(): TelegramService {
    if (!TelegramService.instance) {
      TelegramService.instance = new TelegramService();
    }
    return TelegramService.instance;
  }

  private initWebApp() {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      
      if (window.Telegram.WebApp.initDataUnsafe?.user) {
        this.user = window.Telegram.WebApp.initDataUnsafe.user;
      }
    }
  }

  getUser(): TelegramUser | null {
    return this.user;
  }

  showMainButton(text: string, callback: () => void) {
    if (window.Telegram?.WebApp?.MainButton) {
      window.Telegram.WebApp.MainButton.setText(text);
      window.Telegram.WebApp.MainButton.show();
      window.Telegram.WebApp.MainButton.onClick(callback);
    }
  }

  hideMainButton() {
    if (window.Telegram?.WebApp?.MainButton) {
      window.Telegram.WebApp.MainButton.hide();
    }
  }
}

export const telegramService = TelegramService.getInstance();
