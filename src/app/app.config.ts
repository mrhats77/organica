import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { BrowserModule } from "@angular/platform-browser";





export const appConfig:ApplicationConfig = {
    providers: [
        provideHttpClient(),
        importProvidersFrom(
            FormsModule,
            NgbModule,
            BrowserModule
        ),
        provideRouter(routes)
    ]
}