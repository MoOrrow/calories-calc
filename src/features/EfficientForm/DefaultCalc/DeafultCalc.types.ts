export type TDefaultCalc = {
  items: TDeafultCalcItem[];
  onChange: (value?: any) => void;
};

export type TDeafultCalcItem = {
  title: string;
  value: number | string;
  id: number;
};
