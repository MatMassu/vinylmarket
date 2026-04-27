CREATE TABLE contact_messages (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  message    TEXT        NOT NULL,
  ip         TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX contact_messages_ip_created_at ON contact_messages (ip, created_at DESC);
