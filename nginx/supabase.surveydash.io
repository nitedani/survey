server {
    listen 80;
    listen [::]:80;
    server_name supabase.surveydash.io;

    location / {
        proxy_pass http://localhost:8000/;  # Assuming Kong or your backend service is on this port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeout settings to handle slow responses
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        send_timeout 60s;
    }

    # Security headers
    # add_header X-Frame-Options "SAMEORIGIN";
    # add_header X-Content-Type-Options "nosniff";
    # add_header X-XSS-Protection "1; mode=block";
    # add_header Content-Security-Policy "default-src 'self'";

    # Logging
    access_log /var/log/nginx/supabase_access.log;
    error_log /var/log/nginx/supabase_error.log;

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}