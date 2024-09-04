CREATE TABLE `magic_link` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`token_verifier` text NOT NULL,
	`verification_token` text NOT NULL,
	`expires_at` integer NOT NULL,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
DROP TABLE `session`;