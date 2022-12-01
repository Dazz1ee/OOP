FROM ubuntu:latest

RUN apt-get update && apt-get install --no-install-recommends --no-install-suggests -y curl
RUN apt-get install unzip
RUN apt-get -y install python3
RUN apt-get -y install python3-pip
COPY . /app
WORKDIR /app
RUN pip3 install --no-cache-dir -r requirements.txt
EXPOSE 5000

CMD ["python3","app.py"]
