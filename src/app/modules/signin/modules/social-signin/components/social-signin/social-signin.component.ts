import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'app-social-signin',
  templateUrl: './social-signin.component.html',
  styleUrls: ['./social-signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialSigninComponent {

  @Input() public show = true;

  public redirectUri;

  constructor(
  ) {
    const url = new URL(window.location.origin + window.location.pathname);
    url.pathname = `${url.pathname}/social`;
    this.redirectUri = url.toString();
  }

}
