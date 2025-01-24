import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/my-app/app.component';
import { config } from './app/my-app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
