FROM public.ecr.aws/lambda/nodejs:20

RUN dnf install -y \
    python3 \
    python3-pip \
    java-21-amazon-corretto \
    && dnf clean all

RUN npm install -g typescript ts-node

WORKDIR ${LAMBDA_TASK_ROOT}

COPY package.json .
RUN npm install --production

COPY executor.js .

CMD ["executor.handler"]