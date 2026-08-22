import { useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Link, usePathname } from 'expo-router';

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

export default function Index() {
  const pathname = usePathname();

  useEffect(() => {
    dbg('C', 'app/tabs/index.tsx:mount', 'Tabs Home mounted', {
      os: Platform.OS,
      pathname,
      marker: 'tabs-home-v1',
    });
  }, [pathname]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
