CREATE TABLE "servant" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text NOT NULL,
	"value" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
