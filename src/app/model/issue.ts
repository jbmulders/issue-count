export enum EIssueProps {
  firstName = 'firstName',
  lastName = 'lastName',
  issueCount = 'issueCount',
  dateOfBirth = 'dateOfBirth',
}

export interface IIssue {
  firstName: string;
  lastName: string;
  issueCount: number;
  dateOfBirth: string;
  dateOfBirth_date: Date;
}
