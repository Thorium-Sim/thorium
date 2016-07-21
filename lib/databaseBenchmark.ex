import RethinkDB.Query, only: [table: 1, filter: 2, insert: 2, update: 2, delete: 1, get_all: 3]

defmodule DatabaseBenchmark do
	def run_insert do
		IO.inspect :os.system_time(:milli_seconds)
		run_insert(1)
	end

	def run_insert 2000 do
		IO.inspect :os.system_time(:milli_seconds)
	end

	def run_insert count do
		table("test")
		|> insert(%{"name" => "testObject", "number" => count})
		|> DB.run
		run_insert(count + 1)
	end

	def run_read do
		a = :os.system_time(:milli_seconds)
		run_read(1, a)
	end

	def run_read 2000, time do
		IO.inspect :os.system_time(:milli_seconds) - time
	end

	def run_read count, time do
		IO.inspect table("test")
		|> filter(%{"number" => count})
		#|> get_all(count,%{"index" => "number"})
		|> DB.run
		run_read(count + 1, time)
	end

end