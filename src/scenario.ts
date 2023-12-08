import { Question } from "./question";

export class Scenario {
  environnement: number;
  argent: number;
  ressources: number;
  sante: number;
  frustration: number;
  developpement: number;

  constructor() {
    this.environnement = 4;
    this.argent = 10;
    this.ressources = 10;
    this.sante = 10;
    this.frustration = 10;
    this.developpement = 10;
  }

  updateScenario(question: Question, reponse: boolean) {
    if (reponse) {
      this.environnement += question.oui.environnement;
      this.argent += question.oui.argent;
      this.ressources += question.oui.ressources;
      this.sante += question.oui.sante;
      this.frustration += question.oui.frustration;
      this.developpement += question.oui.developpement;
    } else {
      this.environnement += question.non.environnement;
      this.argent += question.non.argent;
      this.ressources += question.non.ressources;
      this.sante += question.non.sante;
      this.frustration += question.non.frustration;
      this.developpement += question.non.developpement;
    }
  }
}
