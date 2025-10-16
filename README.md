<h1>Hiko Hub</h1>

<p>
  Hiko Hub is a <strong>Laravel Breeze</strong> application powered by
  <strong>PostgreSQL</strong>, <strong>Vite</strong>, and
  <strong>Inertia.js</strong>, featuring <strong>Google reCAPTCHA</strong>
  integration for secure user login. It is designed to manage bookings for
  events and hot-desking spaces, supporting both internal tenants and
  external clients.
</p>

<hr>

<h2>⚙️ Tech Stack</h2>
<ul>
  <li><strong>Laravel Breeze</strong> (backend framework)</li>
  <li><strong>PostgreSQL</strong> (database)</li>
  <li><strong>Vite</strong> (frontend build tool)</li>
  <li><strong>Inertia.js + Vue</strong> (modern reactive front-end)</li>
  <li><strong>Tailwind CSS</strong> (UI styling)</li>
  <li><strong>Google reCAPTCHA API</strong> (bot protection on login)</li>
</ul>

<hr>

<h2>🧩 Environment Configuration</h2>
<p>
  In your project’s root directory, create a <code>.env</code> file and include
  your PostgreSQL connection details along with the Google reCAPTCHA keys.
</p>

<pre><code>DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=hikohub
DB_USERNAME=your_postgres_user
DB_PASSWORD=your_postgres_password

VITE_NOCAPTCHA_SITEKEY=your_recaptcha_site_key
NOCAPTCHA_SECRET=your_recaptcha_secret_key
</code></pre>

<p>Make sure your database is created before running migrations.</p>

<hr>

<h2>🚀 Setup Instructions</h2>

<h3>1. Install Required Software</h3>
<ul>
  <li><a href="https://laravel.com" target="_blank">Laravel</a></li>
  <li><a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a></li>
  <li><a href="https://herd.laravel.com/" target="_blank">Herd</a> (recommended if not using AWS)</li>
</ul>

<h3>2. Download the Project</h3>
<p>Clone or download the repository from GitHub:</p>

<pre><code>git clone https://github.com/bob6720/HikoHub.git
</code></pre>

<h3>3. Prepare the Environment</h3>
<ul>
  <li>Ensure Herd (or AWS) is running all required services.</li>
  <li>Create an empty PostgreSQL database for the project.</li>
  <li>If using Herd, unzip or move the project folder into your Herd projects directory so Herd can recognize and host it.</li>
</ul>

<h3>4. Configure the Project</h3>
<ul>
  <li>Open the project folder in VS Code.</li>
  <li>Create your <code>.env</code> file (see example above).</li>
  <li>Set up your database connection and Google reCAPTCHA credentials.</li>
</ul>

<h3>5. Install &amp; Run</h3>
<p>In your terminal, run the following commands:</p>

<pre><code>cd &lt;path-to-project&gt;
npm install
composer install
php artisan migrate
php artisan db:seed
npm run dev
</code></pre>

<p>
  Once the dev server starts, the terminal will display a local URL (for example
  <code>http://hikohub.test</code>). Click or open that link in your browser to
  view the site.
</p>

<hr>

<h2>🧰 Troubleshooting</h2>

<h3>🪿 Herd not connecting</h3>
<p>
  If you’re using Herd and can’t connect to the project URL, add this line to your
  hosts file:
</p>

<pre><code>C:\Windows\System32\drivers\etc\hosts
127.0.0.1 hikohub.test
</code></pre>

<p>Then try visiting <a href="http://hikohub.test" target="_blank">http://hikohub.test</a> again.</p>

<h3>⚠️ Database Errors</h3>
<p>
  If errors occur when running:
</p>

<pre><code>php artisan migrate
php artisan db:seed
</code></pre>

<p>Make sure that:</p>
<ul>
  <li>The SQL database exists.</li>
  <li>Your PostgreSQL user has permission to access it.</li>
  <li>Your <code>.env</code> database settings are correct.</li>
</ul>

<hr>

<h2>💬 Contact</h2>
<p>
  For any questions about the code, contact:<br>
  <strong>Harry Meyer</strong> — <a href="mailto:meyerharry0@gmail.com">meyerharry0@gmail.com</a>
</p>
