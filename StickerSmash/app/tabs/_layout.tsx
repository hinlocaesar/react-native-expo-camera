import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Tabs, usePathname, useSegments } from 'expo-router';

const dbg = (hypothesisId: string, location: string, message: string, data: Record<string, unknown>) => {
  const payload = JSON.stringify({
    sessionId: '69bbe1',
    runId: 'pre-fix',
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  });
  // #region agent log
  fetch('http://127.0.0.1:7802/ingest/c0f698d7-e811-4a74-b2bc-b71c49cd6b1a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'69bbe1'},body:payload}).catch(()=>{});
  fetch('http://192.168.254.103:7802/ingest/c0f698d7-e811-4a74-b2bc-b71c49cd6b1a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'69bbe1'},body:payload}).catch(()=>{});
  console.log('[debug-69bbe1]', location, message, data);
  // #endregion
};

dbg('A', 'app/tabs/_layout.tsx:module', 'Tabs layout module evaluated', {
  os: Platform.OS,
  folder: 'tabs',
});

export default function TabLayout() {
  const pathname = usePathname();
  const segments = useSegments();

  useEffect(() => {
    dbg('A', 'app/tabs/_layout.tsx:mount', 'Tabs layout mounted', {
      os: Platform.OS,
      pathname,
      segments,
    });
  }, [pathname, segments]);

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="about" options={{ title: 'About' }} />
    </Tabs>
  );
}
