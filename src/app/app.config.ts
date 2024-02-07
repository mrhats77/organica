import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { BrowserModule } from "@angular/platform-browser";
import { AddHeadersInterceptor } from "./core/interceptors/add-headers.interceptor";
import { AppData } from "./app-data";
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';




export const appConfig:ApplicationConfig = {
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AddHeadersInterceptor, multi: true },
        provideHttpClient(),
        importProvidersFrom(
            FormsModule,
            NgbModule,
            BrowserModule,
            InMemoryWebApiModule.forRoot(AppData, { delay: 1000 })
        ),
        
        provideRouter(routes)
    ]
}