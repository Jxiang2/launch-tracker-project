import { useCallback, useEffect, useState } from "react";

import {
  httpGetLaunches,
  httpGetUpcommingLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
} from './requests';

function useLaunches (onSuccessSound, onAbortSound, onFailureSound) {
  const [launches, saveLaunches] = useState([]);
  const [upCommingLaunches, saveupcommingLaunches] = useState([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);

  const getLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetLaunches();
    saveLaunches(fetchedLaunches);
  }, []);

  const getUpCommingLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetUpcommingLaunches();
    saveupcommingLaunches(fetchedLaunches);
  }, []);

  useEffect(() => {
    getLaunches();
    getUpCommingLaunches();
  }, [getLaunches, getUpCommingLaunches]);

  const submitLaunch = useCallback(async (e) => {
    e.preventDefault();
    setPendingLaunch(true);
    const data = new FormData(e.target);
    const launchDate = new Date(data.get("launch-day"));
    const mission = data.get("mission-name");
    const rocket = data.get("rocket-name");
    const target = data.get("planets-selector");
    const response = await httpSubmitLaunch({
      launchDate,
      mission,
      rocket,
      target,
    });

    const success = response.ok;
    if (success) {
      getLaunches();
      getUpCommingLaunches();
      setTimeout(() => {
        setPendingLaunch(false);
        onSuccessSound();
      }, 800);
    } else {
      onFailureSound();
    }
  }, [getLaunches, getUpCommingLaunches, onSuccessSound, onFailureSound]);

  const abortLaunch = useCallback(async (id) => {
    const response = await httpAbortLaunch(id);
    const success = response.ok;
    if (success) {
      getLaunches();
      getUpCommingLaunches();
      onAbortSound();
    } else {
      onFailureSound();
    }
  }, [getLaunches, getUpCommingLaunches, onAbortSound, onFailureSound]);

  return {
    launches,
    upCommingLaunches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  };
}

export default useLaunches;