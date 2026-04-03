FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

WORKDIR /app/src/backend_django
CMD ["python", "manage.py", "migrate"]
CMD ["gunicorn", "backend_django.wsgi:application", "--bind", "0.0.0.0:8000"]