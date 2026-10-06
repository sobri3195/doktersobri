import {spawnSync} from 'node:child_process';const r=spawnSync(process.execPath,['node_modules/vite/bin/vite.js','build','--emptyOutDir=false'],{stdio:'inherit'});process.exit(r.status??1);
