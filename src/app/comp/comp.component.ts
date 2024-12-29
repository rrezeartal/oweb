import { Component, Input } from '@angular/core';
import { Driver } from '../../driver';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comp',
  imports: [CommonModule],
  templateUrl: './comp.component.html',
  styleUrl: './comp.component.css'
})
export class CompComponent {

  @Input()
  vozac: Driver | undefined

  @Input()
  indks: Number | undefined


  onDrvView() {
    //console.log("u clicked me")

    let link: string | undefined; //or var link=''; javascript notacija
    if(this.vozac?.iconUrl){
      link=this.vozac?.iconUrl;
    }else{
      link=`https://www.google.com/search?q=${this.vozac?.name}`;
    }

    window.open(link, "_blank")

  }

  onTeamView() {
    let teamLink: string | undefined;
    if(this.vozac?.team){
      teamLink = `https://www.google.com/search?q=${this.vozac.team}`;
    }else{
      teamLink = "https://www.google.com"
    }
    window.open(teamLink, "_blank")
  }

  klasi() {
    return {
      'begin': true,
      'adv': this.vozac?.category === "EXPERT",
      //'undr': true
      'undr': this.vozac?.category == "ASD",
      'lunatic': this.vozac?.category === "LUNATIC"
    }
  }

  stilovi() {
    return { 'undr': this.vozac?.category == "EXPERT" }
  }

}
