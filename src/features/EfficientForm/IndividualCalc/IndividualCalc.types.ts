export type TIndividualCalc = {
  dataSource: TDataSource[];
};

export type TDataSource = {
  key: number;
  name: string;
  children: TDataChild[];
};

export type TDataChild = {
  key: number;
  name: string;
  duration: number;
  coefficent: number;
};
