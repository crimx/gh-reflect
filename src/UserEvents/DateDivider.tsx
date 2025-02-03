import styles from "./DateDivider.module.scss";

export interface DateDividerProps {
  date: string;
  year: string;
}

export const DateDivider = ({ date, year }: DateDividerProps) => {
  return (
    <div className={styles.container}>
      <strong>{date}</strong> {year}
    </div>
  );
};
