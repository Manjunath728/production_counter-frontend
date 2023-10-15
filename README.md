
## Clone repo Frontend
```bash
git clone https://github.com/Manjunath728/production_counter-frontend
```
Go to directory
```bash
cd production_counter-frontend
```
Install dependencies
```bash
npm i
```

### change the api url in  .env file
```javascript
VITE_API_URL=http://localhost:3000
```
### change port setting in package.json
```javascript
"scripts": {
"dev": "vite --port 5000 ",
"build": "vite build",
"lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
"preview": "vite preview "
},
```
now run vite
```bash
npm run dev
```
