FROM public.ecr.aws/lambda/nodejs:18
RUN yum install -y unzip && \
  curl -Lo "/tmp/chrome-linux.zip" "https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F1129993%2Fchrome-linux.zip?alt=media" && \
  unzip /tmp/chrome-linux.zip -d /opt/

RUN yum install atk cups-libs gtk3 libXcomposite alsa-lib \
    libXcursor libXdamage libXext libXi libXrandr libXScrnSaver \
    libXtst pango at-spi2-atk libXt xorg-x11-server-Xvfb \
    xorg-x11-xauth dbus-glib dbus-glib-devel -y

RUN mv /opt/chrome-linux /opt/chrome

ADD app.js package*.json ./
ADD node_modules ./node_modules

CMD [ "app.lambdaHandler" ]