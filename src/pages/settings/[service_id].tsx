import * as React from 'react';
import { useRouter } from 'next/router';

export default function Settings() {
  const router = useRouter();
  const { service_id } = router.query as { service_id: string };
  return (
    <main>
      <p>Settings</p>
      <p>service_id: {service_id}</p>
    </main>
  );
}
