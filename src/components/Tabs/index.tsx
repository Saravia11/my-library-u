import { useState } from "react";
import { TabsType } from "./types";

import styles from "./styles.module.scss";
import { Button } from "@mui/material";

const Tabs: TabsType = ({ tabs, ContentProps }) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className={styles.tabs}>
      <div className={styles.buttons}>
        {tabs.map((t, i) => (
          <Button
            variant={currentTab == i ? "contained" : "outlined"}
            color="secondary"
            sx={{ borderRadius: "25px" }}
            key={i}
            onClick={() => setCurrentTab(i)}
          >
            {t.buttonText}
          </Button>
        ))}
      </div>
      <div
        {...ContentProps}
        className={`${ContentProps?.className} ${styles.content}`}
      >
        {tabs[currentTab].component}
      </div>
    </div>
  );
};
export default Tabs;
