export class Alert {
  id: string;
  type: AlertType;
  message: string;
  autoClose: boolean;
  keepAfterRouteChange: boolean;
  fade: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
  get icon() {
    return alertIcon[this.type];
  }
}

export enum AlertType {
  Primary,
  Secondary,
  Success,
  Warning,
  Danger,
  Info,
}

const alertIcon = {
  [AlertType.Primary]: 'fas fa-star fa-lg mr-1',
  [AlertType.Secondary]: 'fas fa-comment fa-lg mr-1',
  [AlertType.Success]: 'fas fa-check fa-lg mr-1',
  [AlertType.Warning]: 'fas fa-exclamation-triangle fa-lg mr-1',
  [AlertType.Danger]: 'fas fa-exclamation fa-lg mr-1',
  [AlertType.Info]: 'fas fa-info-circle fa-lg mr-1',
};
