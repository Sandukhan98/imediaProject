import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoiceComponent } from './components/registering/choice/choice.component';
import { CompanyInfoComponent } from './components/registering/company-info/company-info.component';
import { CompanyTVAComponent } from './components/registering/company-tva/company-tva.component';
import { PersonalComponent } from './components/registering/personal/personal.component';

const routes: Routes = [
  { path: 'personal', component: PersonalComponent },
  { path: 'companyTva', component: CompanyTVAComponent },
  { path: '', component: ChoiceComponent },
  { path: 'companyInfo', component: CompanyInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PersonalComponent, CompanyTVAComponent, ChoiceComponent, CompanyInfoComponent]
