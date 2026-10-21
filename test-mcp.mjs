import { spawn } from 'node:child_process';
import path from 'node:path';

const child = spawn('node', [path.resolve('mcp-server.mjs')], {
  stdio: ['pipe', 'pipe', 'inherit']
});

let buffer = '';
child.stdout.on('data', (d) => {
  buffer += d.toString();
  const lines = buffer.split('\n');
  buffer = lines.pop();
  for (const line of lines) {
    if (!line.trim()) continue;
    const msg = JSON.parse(line);
    console.log('[MCP Response]', JSON.stringify(msg, null, 2));
    if (msg.id === 2) {
      console.log('✅ MCP Server Verification Passed!');
      child.kill();
      process.exit(0);
    }
  }
});

// Step 1: Initialize
child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} }) + '\n');
// Step 2: Test Contrast
setTimeout(() => {
  child.stdin.write(JSON.stringify({
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'measure_wcag_contrast',
      arguments: { foregroundHex: '#ffffff', backgroundHex: '#2563eb' }
    }
  }) + '\n');
}, 200);
