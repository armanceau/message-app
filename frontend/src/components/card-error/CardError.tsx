import styles from "./cardError.module.css";
import { XOctagon } from "react-bootstrap-icons";

type Props = {
  message: string;
};

export default function CardError({ message }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.main}>
        <div>
          <XOctagon />
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
}
