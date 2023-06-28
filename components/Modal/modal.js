import React, { useState, useContext } from "react";
import styles from "./modal.module.css";
import { FirebaseContext } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  doc,
  getDocs,
  where,
  updateDoc,
} from "firebase/firestore";

function Report({ publicationId, isVisible, onClose }) {
  const { firebase } = useContext(FirebaseContext);
  const [reason, setReason] = useState("");
  const [anonymus, setAnonymus] = useState(false);

  const saveReport = async () => {
    const reporter = firebase.auth.currentUser;
    const publicationUrl = `${window.location.origin}/publicaciones/${publicationId}`;
    const reportsRef = collection(firebase.db, "reports");
    const reportAlredyExistsQuery = query(
      reportsRef,
      where("publicationUrl", "==", publicationUrl)
    );
    const reportAlredyExists = await getDocs(reportAlredyExistsQuery);
    const reporterInfo = {
      reporter: {
        id: reporter.uid,
        name: anonymus ? "Anónimo" : reporter.displayName,
        email: anonymus ? "N/A" : reporter.email,
      },
      reason,
    };
    if (!reportAlredyExists.empty) {
      reportAlredyExists.docs.map((report) => {
        const userAlredyVotes = report
          .data()
          .reasons.find(
            (existingReport) => existingReport.reporter.id === reporter.uid
          );
        if (userAlredyVotes) return;
        updateDoc(doc(reportsRef, report.id), {
          counter: ++report.data().counter,
          reasons: [...report.data().reasons, { ...reporterInfo }],
        });
      });
    } else {
      await addDoc(reportsRef, {
        publicationId,
        publicationUrl,
        reasons: [
          {
            ...reporterInfo,
          },
        ],
        deleted: false,
        counter: 1,
      });
    }
    setReason("");
    setAnonymus(false);
    onClose();
  };

  if (!isVisible) return;
  return (
    <div className={styles["container"]} onClick={() => onClose()}>
      <div className={styles["content"]} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onClose()}
          className={[styles["close"], styles["button"]].join(" ")}
        >
          X
        </button>
        <div className={styles["body"]}>
          <span className={styles["title"]}>
            ¿Por qué quieres reportar esta publicación?
          </span>
          <textarea
            className={styles["reason"]}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows="5"
          ></textarea>
          <div>
            <input
              id="anonymus"
              type="checkbox"
              checked={anonymus}
              onChange={(event) => setAnonymus(event.target.checked)}
            />{" "}
            <label className={styles["anonymus-label"]} htmlFor="anonymus">
              Reportar anónimamente
            </label>
          </div>
          <button
            disabled={reason.length < 3}
            onClick={() => saveReport()}
            className={[styles["button"], styles["send-report"]].join(" ")}
          >
            Reportar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Report;
