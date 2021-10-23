import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisteringComponent } from './components/registering/registering.component';
import { PersonalComponent } from './components/registering/personal/personal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ChoiceComponent } from './components/registering/choice/choice.component';
import { CompanyTVAComponent } from './components/registering/company-tva/company-tva.component';
import { CompanyInfoComponent } from './components/registering/company-info/company-info.component';
import { PubComponent } from './components/pub/pub.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisteringComponent,
    PersonalComponent,
    ChoiceComponent,
    CompanyTVAComponent,
    CompanyInfoComponent,
    PubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectCountryModule.forRoot('fr'),
    HttpClientModule,
    NgxIntlTelInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
