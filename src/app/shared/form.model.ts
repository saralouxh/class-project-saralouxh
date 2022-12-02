export class FormModel {
  constructor(
    public title: string,
    public nursingTextArea: string,
    public name: string,
    public age: string,
    public allergies: string,
    public codeStatus: string,
    public providerTextArea: string,
    public id?: string
    ) {}
}