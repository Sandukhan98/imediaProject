import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoiceComponent } from './components/registering/choice/choice.component';
import { CompanyInfoComponent } from './components/registering/company-info/company-info.component';
import { CompanyTVAComponent } from './components/registering/company-tva/company-tva.component';
import { PersonalFoundComponent } from './components/registering/personal-found/personal-found.component';
import { PersonalVerifComponent } from './components/registering/personal-verif/personal-verif.component';
import { PersonalComponent } from './components/registering/personal/personal.component';
import { ReadyComponent } from './components/registering/ready/ready.component';

const routes: Routes = [
  { path: 'personal', component: PersonalComponent },
  { path: 'companyTva', component: CompanyTVAComponent },
  { path: '', component: ChoiceComponent },
  { path: 'companyInfo', component: CompanyInfoComponent },
  { path: 'personalVerif', component: PersonalVerifComponent },
  { path: 'personalFound', component: PersonalFoundComponent },
  { path: 'ready', component: ReadyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PersonalComponent, CompanyTVAComponent,
   ChoiceComponent, CompanyInfoComponent, PersonalVerifComponent, PersonalFoundComponent, ReadyComponent]
