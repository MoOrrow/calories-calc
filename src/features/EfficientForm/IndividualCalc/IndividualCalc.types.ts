export type TIndividualCalcData = {
  key: number;
  name: string;
  children: TIndividualCalcDataChild[];
};

export type TIndividualCalcDataChild = {
  key: number;
  name: string;
  duration: number;
  coefficent: number;
  coefficentByDuration: number;
};
