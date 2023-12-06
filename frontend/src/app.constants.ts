import { createContext } from "react";

interface IDataContext {
  filter: IFilter;
  data: IData;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  md: number;
  chartColor: string;
}
export const DataContext = createContext<IDataContext | null>(null);

export interface IDataProp {
  _id: string;
  avgMathScore: number;
  avgReadingScore: number;
  avgWritingScore: number;
}

export interface IData {
  genderData: Array<IDataProp>;
  raceData: Array<IDataProp>;
  parentEducationData: Array<IDataProp>;
  lunchData: Array<IDataProp>;
  testPrepData: Array<IDataProp>;
}

export interface IFilterProp {
  type: "pie" | "line" | "bar" | "area";
  xDataKey: keyof IDataProp;
  yDataKey: keyof IDataProp;
}

export interface IFilter {
  genderData: IFilterProp;
  raceData: IFilterProp;
  parentEducationData: IFilterProp;
  lunchData: IFilterProp;
  testPrepData: IFilterProp;
}
