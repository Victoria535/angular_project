import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from "./app/AppModule";
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);