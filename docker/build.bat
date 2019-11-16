cd ../api
call gradlew jar
cd ..
xcopy api\build\libs docker\out\ /s
cd ui
call npm install
call npm run build
cd ..
xcopy ui\build docker\out\ui\ /s
cd docker
docker build -t sharedlist .
rmdir -r out /s /q
echo "Docker image `sharedlist` has been built."