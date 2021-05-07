FROM alpine
COPY src/server/gateway/gateway /gateway
RUN ["chmod", "+x", "/gateway"]
COPY covrt/build /build
EXPOSE 80
ENTRYPOINT ["/gateway"]