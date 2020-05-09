export default class SoundEffects {
  buttonClick: string[];
  buttonHover: string[];
  cardChange: string[];
  notification: string[];
  login: string[];
  buttonClickVolume: number;
  buttonHoverVolume: number;
  cardChangeVolume: number;
  notificationVolume: number;
  loginVolume: number;
  constructor(params: Partial<SoundEffects> = {}) {
    this.buttonClick = params.buttonClick || [];
    this.buttonHover = params.buttonHover || [];
    this.cardChange = params.cardChange || [];
    this.notification = params.notification || [];
    this.login = params.login || [];
    this.buttonClickVolume = params.buttonClickVolume || 1;
    this.buttonHoverVolume = params.buttonHoverVolume || 1;
    this.cardChangeVolume = params.cardChangeVolume || 1;
    this.notificationVolume = params.notificationVolume || 1;
    this.loginVolume = params.loginVolume || 1;
  }
}
