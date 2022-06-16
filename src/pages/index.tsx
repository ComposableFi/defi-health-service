import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import UpdateBridgeButton from "../components/update-bridge-button";
import { retrieveAllBridges } from "../lib/hasura-api";

export interface BridgeStatus {
  name: string;
  is_healthy: Boolean;
}

const Home: NextPage = () => {
  const [bridges, setBridges] = useState<BridgeStatus[]>();

  const call = async () => {
    const res = await retrieveAllBridges();
    console.log(res);
    //loop through res and get bridges
    const bridges: BridgeStatus[] = res.Bridge.map((b: any) => {
      const bridge: BridgeStatus = {
        name: b.name,
        is_healthy: b.is_healthy,
      };
      return bridge;
    });
    setBridges(bridges);
  };

  useEffect(() => {
    call();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>DeFi Health Service</title>
        <meta
          name="description"
          content="Gets and Sets bridge health statuses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-start flex-grow min-h-screen px-0 mt-16 pb-8">
        <h1>DeFi Health Service</h1>
        <div className="">
          {bridges &&
            bridges.map((b: BridgeStatus) => {
              return (
                <div key={b.name} className="mt-10">
                  <h2>{b.name}</h2>

                  <p>{b.is_healthy ? "Healthy" : "Unhealthy"}</p>

                  <UpdateBridgeButton name={b.name} is_healthy={b.is_healthy} />
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
};

export default Home;
