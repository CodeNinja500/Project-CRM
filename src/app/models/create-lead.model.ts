export interface CreateLeadModel {
  readonly hiring: {
    talentProgram: boolean;
    junior: boolean;
    active: boolean;
  };
  readonly companySize: {
    fe: number;
    dev: number;
    total: number;
  };
  readonly annualRevenue: number;
  readonly name: string;
  readonly industry: string;
  readonly activityIds: string[];
  readonly location: string;
  readonly websiteLink: string;
}
